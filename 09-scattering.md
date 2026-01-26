---
title: "Chapter 9: Scattering" 
short_title: "Ch. 9: Scattering"
numbering:
  enumerator: 9.%s
---

`````{important} Video: Scattering I
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/dbf4313f257d40619f647ab6f08f44d51d
:width: 100%
```
````{tip} Slides
:class: dropdown
 ```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/Lecture%20Slides/QM-9-I.pdf
:width: 100%
```
````
`````

In the previous two chapters we have focused our attention on situations where a particle is bound inside a potential well. This is a situation which is very prevalent and important. In these cases, we saw that a particle can only have special discrete energies. 

Prior to this we studied a free particle — when there were no forces acting, and so far this has been the only instance of a **non-bound** state that we have considered. In this final chapter considering quantum mechanics in 1D, we will now return to a situation where a particle is non-bound, but one that is more interesting and physical than the free particle.

We will consider the situation where a particle **scatters** off of a target, which we model by a change in potential. This is a very important physical situation which arises in a wide range of situations, from neutrons scattering in condensed matter physics, to the scattering of particles off each other in particle detectors. Our goal here is to understand the basics of scattering in quantum mechanics. 

We will consider just one simple potential — an abrupt change. The motivation for studying this is somewhat similar to our motivation for studying the infinite square well. While this is far from realistic, it is simple enough that we can solve exactly for the energy eigenstates (which are now no longer momentum eigenstates, like for the free particle). We can then use these to numerically study what happens when a wavepacket scatters off of the step. 

We will uncover one final new aspect of quantum mechanics, which is almost the complete **opposite** of tunnelling. Whereas in tunnelling a quantum particle enters a region of space it should not have enough energy to enter, in this chapter we will see that quantum particles **reflect** off of abrupt changes in potential — **whether those changes are positive or negative**. That is, quantum particle reflect off of cliff edges, and therefore **fail to enter a region that they would definitely enter**. 

## The finite step potential
In this chapter we will consider the following potential function
\begin{equation}
	V(x) = \begin{cases}
	0 & \text{if } x < 0, \\
	V_0 & \text{if } x \geq 0.
\end{cases}
\end{equation}
depicted in [](#potential-step). 

````{figure} ./Pictures/potential-step.svg
:name: potential-step
:width: 400px
:align: center

**The potential step.**
     The potential energy vanishes for $x < 0$, and is equal to $V_0$ for $x \geq 0$. In the figure we have taken $V_0 > 0$, although in the mathematics that follows, we make consider $V_0$ to be either positive or negative.  
````

This corresponds to an abrupt change in potential from $V(x) = 0$ to $V(x) = V_0$ at the origin. It is important to note that $V_0$ could be either **positive** or **negative**, meaning that the potential energy either steps up or down. We will primarily keep in the back of our mind that $V_0 > 0$, but will also discuss what happens if $V_0 < 0$. 

Our goal, as always, is to find the energy eigenstates of the potential well, which we will do by solving the TISE to find the energy eigenfunctions. Since the particle isn't bound, we expect that the energy should vary **continuously** and the eigenfunctions shouldn't be physical and normalisable. We will indeed see that this is the case below. 

## Energy eigenfunctions of the potential step

The approach that we will take is going to be similar to the infinite square well — since the potential energy is specified in pieces, we will seek to solve for the energy eigenfunctions in pieces also. We will call the region to the left of the step **region I** ($x < 0$) and the region to the right of the step **region II** ($x \geq 0$). We will call the energy eigenfunctions in these regions $u_E^\rI(x)$ and $u_E^\rII(x)$ respectively, such that
```{math}
:label: e-eig-step
u_E(x) = \begin{cases}
u_E^\rI(x) &\text{ if } x < 0, \\
u_E^\rII(x) &\text{ if } x \geq 0.
\end{cases}
```
After solving for the two pieces, we will join them together using the **continuity** of energy eigenfunctions, as we did in the case of the eigenfunctions of the infinite square well (with one additional new ingredient). 

### Energy eigenfunctions in Region I

We will start off considering Region I, to the left of the step. In this region $V(x) = 0$. Therefore, just as happened inside the infinite square well in [](#s-ISW-rII),
```{math}
\op{H} = \frac{\op{P}^2}{2M}
```
and so, just as we were able to do there, we can **immediately write down the energy eigenfunction**, as this is the same Hamiltonian (and the same as the free particle also!). As we discussed in [](#s-ISW-rII), any function of the form
```{math}
:label: e-scattering-rI
\vph u_E^\rI(x) = A e^{ikx} + Be^{-ikx},
```
will be an eigenfunction, where $A$ and $B$ are arbitrary complex numbers, where the corresponding energy eigenvalue is  
```{math}
:label: e-k
\vph E = \frac{\hbar^2 k^2}{2M}.
```
Just as in the case of the infinite square well, we **don't yet know which superposition of $e^{ikx}$ and $e^{-ikx}$ we should take** (i.e. how to choose $A$ and $B$). For the moment we will leave them general, and see that we can determine them later, using continuity. 

### Energy eigenfunctions in Region II

We now turn our attention to Region II, to the right of the step. In this region $V(x) = V_0$. In this region $\op{H} = \frac{\op{P}^2}{2M} + V_0$, and the TISE we want to solve is
```{math}
:label: e-scattering-TISE-rII
\left(\frac{\op{P}^2}{2M} + V_0\right)u_E^\rII(x) = E u_E^\rII(x).
```
We can move the term involving $V_0$ from the left-hand to the right-hand side, to express this as
```{math}
\frac{\op{P}^2}{2M}u_E^\rII(x) = (E-V_0) u_E^\rII(x).
```
Since $V_0$ is just a constant, this has again **exactly the same form as for a free particle** except we are looking for an eigenvalue of $E' = (E-V_0)$, instead of $E$. The only **subtlety** we need to be careful about is that previously we tacitly had $E\geq 0$. We will therefore **make the same assumption that $E' \geq 0$**, i.e that $E > V_0$. Physically this means we are going to consider situations where **the particle has enough energy to classically climb the potential step**. We will study the opposite situation as an [exercise](#ex-E-below-V0). 

Given the above, we can once again **write down the solution**! In particular, the energy eigenfunction in region II will be identical in form to an energy eigenfunction **without a potential** and with energy $E'$. The solution is therefore 
```{math}
\vph u_E^\rII(x) = C e^{ik'x} + De^{-ik'x},
```
where $C$ and $D$ are two new constants (that we will also need to determine in due course), and 
```{math}
:label: e-kp
\vph E - V_0 = \frac{\hbar^2 k'^2}{2M}.
```
Taking a step back (no pun intended), this makes **perfect sense**. Once the particle has passed the step, its potential energy has increased by $V_0$. The total energy is still $E$, and so the kinetic energy of the particle is now $E - V_0$. This is why we see that energy eigenfunction has exactly the same form as an energy eigenfunction with $E' = E - V_0$. 

### Right-moving and Left-moving eigenstates

Putting everything together that we have learnt so far, we know that the energy eigenfunctions of the potential step have the form 
```{math}
:label: e-eig-step-1
u_E(x) = \begin{cases}
A e^{ikx} + Be^{-ikx} &\text{ if } x < 0, \\
C e^{ik'x} + De^{-ik'x} &\text{ if } x \geq 0.
\end{cases}
```
where $A$, $B$, $C$ and $D$ are complex constants, that we need to determine,  and $k$ and $k'$ are functions of the energy and step height, specified via [](#e-k) and [](#e-kp) respectively. 

In order to make progress, we first need to cast our mind back to [](06-free-particle), and the fact that we found there **two degenerate eigenstates for each energy**. *What were the two degenerate eigenstates?* They were the two momentum eigenstates with equal and opposite momentum, $\ket{p}$ and $\ket{-p}$. 

Here we are going to have something **very similar**. What we need to understand is **what are the analogue of these two eigenstates here?** The key insight is that a momentum eigenstate with **positive momentum** represents a particle moving to the right, while an eigenstate of **negative momentum** represents one moving to the left. We thus want to identify **right-moving** and **left-moving** eigenstates of the step, as the two basic states of interest. 

We will be able to do this, but we need to use a bit of **foresight**. In particular, as stated in the introduction, **quantum particles reflect off of abrupt changes in potential**, irrespective of whether that is a positive or negative change. *What does this imply about left-moving and right-moving states?* Let us start off by considering a right-moving state in region I, which would correspond to $e^{ikx}$ (since this has the same form as a positive momentum state in this region, if $k > 0$). When it reaches the step, it will reflect, creating a component $e^{-ikx}$ (essentially a negative momentum state), and also pass through, creating a component $e^{ik'x}$ in region II (with positive momentum). In region II however, there will be **no negative momentum component** (i.e. component of the form $e^{-ik'x}$). 

This is summarised graphically in [](#left-right-moving) (a). 

````{figure} ./Pictures/left-moving-right-moving.svg
:name: left-right-moving
:width: 500px
:align: center

**Right-moving and Left-moving situations**. (a) In a 'right-moving' situation, a particle approaches the step from the left, with positive momentum. It is then partially reflected by the step, and partially transmitted. (b) In a 'left-moving' situation, everything is reversed. The particle approaches the step from the right with negative momentum. It is then partially reflected, and partially transmitted.
````

This line of reasoning suggests that we should take $D = 0$ in [](#e-eig-step-1) when considering right-moving eigenfunctions. We will denote this eigenfunction by $u_E^\rR(x)$ ('R' for 'right-moving'), and their general form will be
```{math}
:label: e-eig-step-R
u_E^\rR(x) = \begin{cases}
A e^{ikx} + Be^{-ikx} &\text{ if } x < 0, \\
C e^{ik'x} &\text{ if } x \geq 0.
\end{cases}
```

A similar line of reasoning, which you are encouraged to think through, and which is summarised in [](#left-right-moving) (b), suggests that we should take $A = 0$ in order to define left-moving eigenfunctions, which we denote by $u_E^\rL(x)$, and have the general form
```{math}
:label: e-eig-step-L
u_E^\rL(x) = \begin{cases}
B'e^{-ikx} &\text{ if } x < 0, \\
C' e^{ik'x} + D'e^{-ik'x} &\text{ if } x \geq 0.
\end{cases}
```
(where we now use primes on the constants $B'$, $C'$ and $D'$, to highlight the fact that this is a **distinct** eigenfunction with distinct unknown parameters at this stage). 

In what follows, we will focus on **right-moving** particles, and leave the corresponding analysis of **left-moving** particles as an [exercise](#ex-left-moving).

### Continuity of eigenfunctions and their first derivatives

`````{important} Video: Scattering II
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/dc7050cc03e74c499bfe36d91aee87051d
:width: 100%
```
````{tip} Slides
:class: dropdown
%```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/Lecture%20Slides/QM-9-II.pdf
:width: 100%
```
````
`````

We will now see how we can fix the unknown constants in the eigenfunctions. First, as we learnt in [](#s-continuity-isw), **energy eigenfunctions must be continuous**. We must apply this fact at the potential step ($x = 0$), as for general choices of $A$, $B$ and $C$ this won't be the case. In particular, from [](#e-eig-step-R) we see that at $x = 0$ $u_E^\rR(0) = C$ (since we include $x = 0$ in region II). If we approach the origin from region I, i.e. take $x \to 0$ from below, we find $u_E^\rR(0) = A + B$. In order for eigenfunction to be continuous, we must therefore have
```{math}
A + B = C.
```
We can use this equation to solve for one of the constants, e.g. to eliminate $C$ directly. This still leaves us with two constants. 

To fix another constant, we need to introduce one **further fact** about energy eigenfunctions: 

> The first spatial derivatives of energy eigenfunctions are **also continuous**.

Like many good rules, this one **has an exception**! There is only one situation where the spatial derivative of an energy eigenfunction doesn't have to be continuous, and this is **precisely the situation we encountered when studying the infinite square well**: it is when the **potential is infinite**. 

We therefore didn't introduce this fact previously, as we happened to be in the one exceptional case. We are introducing **now** as for the potential step, the potential is **finite everywhere** and hence we do need to impose continuity of the spatial derivative.

*What does it mean for a function to have a continuous derivative*? This means that there will be no **kinks** in the graph — no points where the function changes slope abruptly. Thus energy eigenfunctions cannot have jumps or kinks (except where the potential is infinite). 

Let us now see how to apply this. We can easily calculate the spatial derivative in the two regions, to find that 

```{math}
:label: e-eig-step-R-ddx
\frac{\partial}{\partial x}u_E^\rR(x) = \begin{cases}
ik(A e^{ikx} - Be^{-ikx}) &\text{ if } x < 0, \\
ik'(A+B) e^{ik'x} &\text{ if } x \geq 0.
\end{cases}
```

(where we have substituted $C = A+B$ already). We then demand continuity just as did above. At $x = 0$, we have $\frac{\partial u_E^\rR}{\partial x}\big|_{x=0} = ik'(A+B)$. On the other hand, if we approach $0$ in region II from below, we find on  $\frac{\partial u_E^\rR}{\partial x}\big|_{x=0} = ik(A-B).$ Thus, in order to have a continuous first spatial derivative, we must have
```{math}
ik'(A+B) = ik(A-B). 
```
We can use this to solve for $B$, which after a small amount of re-arranging, leads to
```{math}
:label: e-B-f-A-scattering
B = \frac{k-k'}{k+k'}A.
```
*What about the final constant $A$?* As always, this is in fact just an overall **normalisation constant**. Since here we are considering a **non-bound** state, energy varies continuously, and **energy eigenfunctions are unnormalisable**. We can therefore take $A = 1$ **for simplicity**. There is no real natural choice for $A$, and this is as good as any. Altogether, we therefore find that the energy eigenfunction of energy $E$ for a **right-moving** particle is
````{card}
```{math}
:label: e-eig-step-R-final
u_E^\rR(x) = \begin{cases}
e^{ikx} + \frac{k-k'}{k+k'}e^{-ikx} &\text{ if } x < 0, \\
\frac{2k}{k+k'} e^{ik'x} &\text{ if } x \geq 0.
\end{cases}
```
````
This eigenfunction (for one choice of $E$) is depicted below in [](#right-moving-scatter). 

````{figure} ./Pictures/right-moving-scattering-phase.png
:name: right-moving-scatter
:width: 600px
:align: center

**Right-moving energy eigenfunction of the potential step**. Colour plot of a right-moving energy eigenfunction, given in [](#e-eig-step-R-final). For illustrative purposes, we also plot the potential step, to highlight where it is in relation to the wavefunction (the height of the step has relation to the amplitude of the wavefunction). On the left of the step, where there is both the incoming and reflected component of the wavefunction, there is interference, leading to sinusoidal oscillations. On the right, where there is only the transmitted component, the modulus of the wavefunction is constant. 
````

As a summary of what we have achieved: in [](#e-eig-step-R-final) we have found the wavefunction of the quantum step Hamiltonian with constant energy $E$, that is 'right-moving', in the sense that when we look on the left of the step, we only have a positive momentum component. We found this by using two key **mathematical properties** of energy eigenfunctions: that they are **continuous** (as previously seen), and that they have a **continuous derivative** (which is new here). More informally, this ensured that the function has no 'jumps' and no 'kinks'. Just as with the free particle, there is a **second degenerate energy eigenfunction of energy $E$**. This corresponds to a **left-moving** particle, and you will solve for it as an [exercise](#ex-left-moving) below. 

We will now analyse some of the interesting **physics** of these eigenfunctions, before briefly outlining how **they can be used** to study the dynamics of particles (although you won't be expected to do this yourself, only to appreciate qualitatively what is found). 

## Reflection and transmission coefficients

What we would like to understand now as quantitatively as possible, is the meaning of the superposition appearing in [](#e-eig-step-R-final). We will see how to do this in terms of so-called **reflection** and **transmission** coefficients. 

The main point we would like to understand is the significance of [](#e-B-f-A-scattering), namely how the **amplitude** of the **reflected** component $e^{-ikx}$ relates to the **amplitude** of the **incoming** component $e^{ikx}$ (which we have taken to be $A = 1$ for simplicity). 

We can start by considering an extreme case: that if **no potential step**. That is, we can set $V_0 = 0$, and ask what happens to the energy eigenfunction. In this case, we know what we should hope to find, since this corresponds to a [](06-free-particle.md), and hence the energy eigenfunctions should just be **momentum eigenfunctions**. This is precisely what we find, since from [](#e-kp), in this case $k' = k$, and hence $B = 0$, leaving us with simply the component $e^{ikx}$ for all $x$, corresponding to a momentum eigenfunction with momentum $p = \hbar k$. 

This is reassuring, but what about for $V_0 \neq 0$? Here we see that $B$ **depends upon the energy relative to the step height**, since $E$ and $V_0$ specify $k$ and $k'$. This shows that the **reflected component** is energy dependent. 

The way this is usually studied is by introducing the so-called **reflection coefficient**: it is taken to be, by definition, the squared-modulus of $B$:
````{card}
```{math}
:label: e-R-coeff
R = |B|^2 = \vph \left(\frac{k-k'}{k+k'}\right)^2
```
````
```{aside} *Why is this a good definition?* 
*It is a little subtle, but **essentially** this captures roughly the **probability** that a particle of energy $E$ will be reflected. This isn't strictly true, since energy eigenstates aren't physical states (being unnormalisable). More formally, one can define the notion of a **probability current** (which unfortunately we don't have time to do in this course). $R$ can then be shown to be exactly the **size** of the reflected probability current relative to the incoming probability current.*
```

It is most insightful to re-express this not in terms of $k$ and $k'$, but instead in terms of the physical parameters: the **energy** $E$ and the height of the potential step $V_0$. As you will show in an [exercise](#ex-R-physical), 
````{card}
```{math}
:label: e-R-coeff-phys
R = \left(\frac{\sqrt{\frac{E}{V_0}}-\sqrt{\frac{E}{V_0}-1}}{\sqrt{\frac{E}{V_0}}+\sqrt{\frac{E}{V_0}-1}}\right)^2
```
````
We already saw that $B = 0$ when $V_0 = 0$, hence $R = |B|^2 = 0$, so the reflection coefficient can be as small as $0$. On the other hand, if $E$ becomes **very close** to $V_0$ (so that classically, it would only just be able to pass the barrier, after which it would then come to rest, having essentially no kinetic energy), $R$ will become very close to unity, since the second term in both the numerator and denominator will become very small. Thus, even though $E > V_0$, we can have **almost perfect reflection**! This is depicted in [](#R+T). This is the **new quantum feature we discussed in the introduction**.

````{figure} ./Pictures/R-T.svg
:name: R+T
:width: 450px
:align: center

**Reflection and transmission coefficients**. Plot of reflection and transmission coefficients for the finite step, as given in [](#e-R-coeff-phys) and [](#e-T-coeff-phys). We see that the particle is perfectly reflected when $E = V_0$, and that the reflection coefficient is large only for $E$ close to $V_0$. For large values of $E/V_0$, the particle is transmitted with almost unit probability.
````

In an [exercise](#ex-V0-neg-R), you will furthermore see that we have reflection **even when $V_0$ is negative** — where naively we would not expect to see any reflection at all, since the particle always has enough energy to pass the step. 

Finally, since we see in the graph that $0 \leq R \leq 1$, we can define the **transmission coefficient** in a very natural way, as $T = 1-R$, so that, by construction $R + T = 1$. That is, if the particle isn't reflected, then it is transmitted. With this definition, we have
````{card}
```{math}
:label: e-T-coeff-phys
T = \frac{4\sqrt{\frac{E}{V_0}}\sqrt{\frac{E}{V_0}-1}}{\left(\sqrt{\frac{E}{V_0}}+\sqrt{\frac{E}{V_0}-1}\right)^2}
```
````
This is also plotted in [](#R+T). 

## Evolution of wavefunctions

`````{important} Video: Scattering III
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/7a28c68ce9264309b3841df1953092c01d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/Lecture%20Slides/QM-9-III.pdf
:width: 100%
```
````
`````

Finally, we will briefly discuss how we can **use the energy eigenfunctions** in order to study the behaviour of **normalised wavefunctions**. The idea is very similar in fact to how we used the energy eigenstates of a free particle in order to study their evolution: although an individual energy eigenstate in that case was a momentum state, and therefore an unphysical and unnormalisable state, we nevertheless **use them** as a convenient **basis** from which we can form well-behaved **superpositions**.

For the finite step potential, we can do **exactly the same**! In particular, we can form initial quantum states of the form
```{math}
:label: e-psi-in-scattering
\ket{\psi_\init} = \vph \int_{V_0}^\infty \phi_\init(E) \ket{E^\rR} dE,
```
where 
```{math}
\ket{E^\rR} = \infint u_E^\rR(x) \ket{x} dx,
```
is the **right-moving** energy eigenstate of energy $E$ associated to the energy eigenfunction $u_E^\rR(x)$ in the usual way.

*Why do we take only superpositions of right-moving eigenstates?* This isn't necessary, but it is very **natural**: we want to to consider sending in initial wavefunctions from the left, moving **towards the step** so that it **scatters off of it**. In order to study this, we just need to use the right-moving states. This is just like how we would only expect to use superpositions of **positive momentum** states if we were considering a free particle moving towards the right. 

Now, just as in all previous cases, since in [](#e-psi-in-scattering) the initial state is written as a **superposition** of energy eigenstates, we can use the **superposition** principle to **write down** the quantum state at time $t$, assuming that the state at $t = 0$ is $\ket{\psi(0)} = \ket{\psi_\init}$. It will be
````{card}
```{math}
\ket{\psi(t)} = \int_{V_0}^\infty \phi_\init(E) e^{-iEt/\hbar} \ket{E^\rR}dE.
```
```` 
and the corresponding wavefunction will be 
````{card}
```{math}
\psi(x,t) = \int_{V_0}^\infty \phi_\init(E) u_E^\rR(x) e^{-iEt/\hbar}  dE.
```
````
In the small animation below, we show the evolution of a **Gaussian** wavefunction:
```{figure} ./Pictures/finite-step-scattering.gif
:name: scattering-gaussian
:width: 600px
:align: center

**Scattering of a Gaussian wavepacket by a potential step.**  An animation of the scattering of a Gaussian wavepacket by a step potential. In the top plot, we show the wavefunction $|\psi(x,t)|$ using a colour plot. In the bottom plot, we show the associated probability density $\pd(x,t)$. The potential step is also plotted, for illustrative purposes only. The particle approaches the step from the left (with positive momentum), and energy larger than the potential height $V_0$. Nevertheless, the particle is partially reflected by the step, such that the final state of the particle is a superposition of a left-moving Gaussian after the step, and a right-moving Gaussian that has been reflected by the step.
```

We thus see that, as stated, the particle really does partially reflect and partially transmit. In the process, we also see some interesting dynamical features — in particular we see the presence of **interference fringes** during the period before the two distinct Gaussian components of the wavefunction emerge. 

The above is just one example, but captures the most important features of scattering in quantum mechanics. We could of course also study more realistic changes in potential (i.e. different forces exerted by the scatterer), however then in general it isn't possible to solve everything analytically as we have done here. 

This brings to a close our study of quantum mechanics in one dimension! In the next chapter, we will begin exploring the more physically relavant situation of the mechanics of a quantum particle in three dimensions. 

## Exercises

````{exercise}
:label: ex-left-moving

In this exercise we will find the **left-moving** energy eigenfunction of energy $E$. Our starting point is the general form identified in the main text, 
![](#e-eig-step-L)
1. Use continuity of the eigenfunction at $x = 0$ to show that $B' = C' + D'$. Use this to eliminate $B'$. 
2. Calculate $\frac{\partial}{\partial x} u_E^\rL(x)$. 
3. Use continuity of the first derivative of the eigenfunction at $x = 0$ to show that $kB' = k'(D'-C')$. 
4. Using part 1 and part 3, show that  $ C' = \left(\frac{k'-k}{k'+k}\right)D'$ and $B' = \left(\frac{2k'}{k'+k}\right)D'$.
5. $D'$ is an overall normalisation constant which we choose to be $D' = 1$. Find a final expression for the left-moving energy eigenfunction of energy $E$. 

```{dropdown} Answers
1. n/a (show that).
2. $$ \frac{\partial u_E^\rL(x)}{\partial x} = \begin{cases}
-ikB'e^{-ikx} &\text{ if } x < 0, \\
ik'(C' e^{ik'x} - D'e^{-ik'x}) &\text{ if } x \geq 0.
\end{cases} $$
3. n/a (show that)
4. n/a (show that)
5. $$ u_E^\rL(x) = \begin{cases}
\frac{2k'}{k'+k}e^{-ikx} &\text{ if } x < 0, \\
\frac{k'-k}{k'+k} e^{ik'x} + e^{-ik'x} &\text{ if } x \geq 0.
\end{cases}$$
```
````

````{exercise}
:label: ex-E-below-V0
In this exercise we will find the energy eigenfunction when $0 < E < V_0$. In Region I the situation is identical to before, given by [](#e-scattering-rI). We will therefore begin by focusing on region II, $x \geq 0$.  
1. Starting from the TISE in Region II (i.e. [](#e-scattering-TISE-rII)), substitute in for $\op{P}^2$, and re-arrange to show that it can be written as $$ \vph\frac{\partial^2 u_E^\rII}{\partial x^2} = \frac{2M}{\hbar^2}(V_0 - E)u_E^\rII(x).$$
2. Since $(V-E_0)$ is now positive, define $\lambda^2 = 2M(V_0 - E)/\hbar^2$. Show that $e^{\lambda x}$ and $e^{-\lambda x}$ are both solutions to the TISE from part 1. 
We will discount the solution $e^{\lambda x}$ on **physical grounds**: this would correspond to an exponentially increasing probability density to find the particle beyond the step, which is unreasonable. We will therefore take the solution in Region II to be $u_E^\rII(x) = Ce^{-\lambda x}$.
3. Use continuity of the energy eigenfunction at $x = 0$ to show that $A + B = C$.
4. Calculate $\frac{\partial}{\partial x} u_E(x)$.
5. Use continuity of the first derivative of the eigenfunction at $x = 0$ to show that $ik(A-B) = -\lambda C$. 
4. Using part 3 and part 5, show that  $ B = -\left(\frac{\lambda + ik}{\lambda - ik}\right)A$ and $C = -\left(\frac{2ik}{\lambda - ik}\right)A.$
5. $A$ is an overall normalisation constant which we choose to be $A = 1$. Find a final expression for the energy eigenfunction of energy $E < V_0$. 
6. Calculate the reflection coefficient $R = |B|^2$. Does your answer make physical sense?

```{dropdown} Answers
1. n/a (show that).
2. n/a (show that).
3. n/a (show that).
4. $$ \frac{\partial u_E(x)}{\partial x} = \begin{cases}
ik(A e^{ikx} - Be^{-ikx}) &\text{ if } x < 0, \\
-\lambda C e^{-\lambda x} &\text{ if } x \geq 0.
\end{cases} $$
5. n/a (show that).
6. n.a (show that).
7. $$ u_E(x) = \begin{cases}
e^{ikx} - \frac{\lambda + ik}{\lambda - ik}e^{-ikx} &\text{ if } x < 0, \\
-\frac{2ik}{\lambda - ik}e^{-\lambda x} &\text{ if } x \geq 0.
\end{cases}$$
8. $R = 1$. This makes sense: the particle is definitely reflected (although it **tunnels** into the wall a little first!). 
```
````

````{exercise}
:label: ex-R-physical
1. Starting from [](#e-k), write $k$ as a function of $E$.
2. Starting from [](#e-kp), write $k'$ as a function of $E$ and $V_0$. 
3. Substitute your answers from part 1 and part 2  into [](#e-R-coeff), to show that after appropriate simplification, you arrive at [](#e-R-coeff-phys). 
```{dropdown} Answers
1. $k = \sqrt{2ME}/\hbar$. 
2. $k' = \sqrt{2M(E - V_0)}/\hbar$.
3. n/a (show that). 
```
````

````{exercise}
:label: ex-V0-neg-R
Equation [](#e-R-coeff-phys) is not valid if $V_0 < 0$, since then the terms inside the second square root in the numerator and denominator are negative. This is because when we divided by $V_0$, it was tacitly assumed that $V_0 > 0$. We will fix this in this exercise. 
1. Starting from [](#e-R-coeff), and using parts 1 and 2 from [](#ex-R-physical), show that we can also write $R$ as
$$ R = \left(\frac{\sqrt{E} - \sqrt{E-V_0}}{\sqrt{E} + \sqrt{E-V_0}}\right)^2.$$
2. Assume $V_0 = -1$ (which fixes the overall energy scale). Plot $R$ as a function of $E$ (using e.g. Desmos), to show that we **still** have reflection for small energies. 
```{dropdown} Answers
1. n/a (show that). 
2. n/a (plot). 
```
````