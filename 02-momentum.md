---
title: "Chapter 2: The momentum of a quantum particle" 
short_title: "Ch. 2: Momentum"
numbering:
  enumerator: 2.%s
---

In the previous chapter we begin our investigation of the quantum mechanics of a particle moving in one dimension, focusing on the **position** of the particle. Here we will continue our development, by now considering how **momentum** is described quantum mechanically. We will see in this chapter that momentum is related to **wave-like** properties of a particle. 

We will introduce the **momentum wavefunction** $\tilde{\psi}(p)$, (in analogy to the spatial wavefunction $\psi(x)$), and give the relationship to the latter, and also introduce the **momentum operator** $\hat{P}$ and its associated operator $\op{P}$ (that acts upon wavefunctions $\psi(x)$). 

## The De Broglie relation and states of definite momentum

Our starting point for understanding the momentum of a quantum particle will in fact be the famous **de Broglie** relationship, which stated that if a particle had a momentum $p$, then it had a wavelength of $\lambda$ equal to
```{math}
:label: e-de-Broglie
\lambda = \frac{h}{p},
```
where $h$ is **Planck's constant**. While this formula is part of '*old quantum theory*' it turns out that the basic insight is ultimately correct. More concretely, what is correct in quantum mechanics is 
>  A quantum particle with definite momentum $p$ has a wavefunction with a definite wavelength $\lambda = h/p$. 

What is a wavefunction with a definite wavelength $\lambda$? This could potentially mean a couple of things, for example $\cos(2\pi x/\lambda)$ or $\sin(2\pi x/\lambda)$? These are both examples of plane waves of wavelength $\lambda$. Neither of these happen to be the correct answer. What we actually mean is a **complex plane wave** 
```{math}
:label: e-complex-plane-wave
Ae^{2\pi i x / \lambda}
``` 
where $A$ is the amplitude (which we take to be real out of convenience for the moment, and will come back to shortly). This is depicted in the following:
```{figure} ./Pictures/complex-circ.svg
:name: f-complex-plane-wave
:alt: Picture of a quantum particle now in one of eight possible locations
:width: 500px
:align: center
**Complex plane waves** 3 different ways of representing a visually representing a complex plane wave. (a) A plot of the real and imaginary parts of the function. We have $\mathrm{Re}(Ae^{2\pi i x/\lambda}) = A\cos (2\pi x/\lambda)$ and $\mathrm{Im}(Ae^{2\pi i x/\lambda}) = A\sin (2\pi x/\lambda)$. (b) A 3-D plot of this function, with the real and imaginary parts plotted along two orthgonal directions. In this representation, we see that a complex plane wave corresponds to a helix. (c) Polar representation of the function, where the phase is represented by colour. In this representation we have a stripy constant line. 
```

If we substitute the de Broglie relation [](#e-de-Broglie) into [](#e-complex-plane-wave), then we see that
```{math}
Ae^{2\pi i x/\lambda} = Ae^{2\pi i p x/h} = A e^{ipx/\hbar},
```
where
````{card}
```{math}
\hbar = \frac{h}{2\pi},
```
````
is the so-called **reduced Planck constant** or simply '**h-bar**' for short. 

Putting everything together, in quantum mechanics, **particles that have a definite momentum $p$ have wavefunctions $v_p(x)$ given by
````{card}
```{math}
:label: e-momentum-state-wavefunction
v_p(x) = A e^{ipx/\hbar},
```
````
corresponding to **complex plane waves** of wavelength $\lambda = h/p$. We will take this essentially as a **postulate**, and not attempt to derive this. 

Using [](#e-general-quantum-state), i.e. the general relationship between a quantum state and a wavefunction, this means we can **directly write down** quantum states of definite momentum, which we will denote by $\ket{p}$ and refer to as `momentum states' (in analogy to our notation $\ket{x}$ for position states). These are
```{math}
:label: e-momentum-state-1
\ket{p} = \infint v_p(x) \ket{x} dx = A\infint e^{ipx/\hbar} \ket{x} dx.
```
We still have some ambiguity here: we haven't specified what the `amplitude' $A$ should be. We can fix this by analogy to position states. Recall that in [](#e-position-norm) we normalised position states using the Dirac delta function. Here, we will demand that momentum states satisfy the same normalisation condition:
````{card}
```{math}
:label: e-momentum-norm
\inner{p'}{p} = \delta(p-p').
```
````
As an exercise, you will show that this fixes $A = \frac{1}{\sqrt{2\pi \hbar}}$. We thus have
````{card}
```{math}
:label: e-momentum-eigenstate
\ket{p} = \frac{1}{\sqrt{2\pi \hbar}}\infint e^{ipx/\hbar} \ket{x} dx
```
````
are **quantum states of definite momentum**. 

Note that due to [](#e-momentum-norm), states of definite momentum have **infinite normalisation** (just like states of definite position). What this means is that they are, once again, **unphysical states**! We thus have another profound conclusion:
> It is physically impossible in quantum mechanics for a particle to have a definite momentum.

We can understand this from a second perspective. Our requirement to have a definite wavelength means that a particle has to be spread out **everywhere**. If this were possible, then what would be probability density $p(x)$ to find the particle at some location $x$? This would be
```{math}
\vph p(x) = |v_p(x)|^2 &= \left| \frac{1}{\sqrt{2\pi \hbar}}e^{ipx/\hbar}\right|^2, \\
&= \frac{1}{\sqrt{2\pi \hbar}}e^{-ipx/\hbar}\frac{1}{\sqrt{2\pi \hbar}}e^{ipx/\hbar}, \\
&= \frac{1}{2\pi \hbar}.
```
This is a **uniform** probability density — we are equally likely to find the particle anywhere. If we then ask what is the **total** probability to find the particle anywhere, we see that
```{math}
\infint p(x) dx = \infint \frac{1}{2\pi \hbar} dx = \infty. 
```
This is an unphysical result. Furthermore, we can't even 'fix' it, by changing our normalisation, since **any** non-zero choice of normalisation will lead to the same conclusion. We therefore see that it must be physically impossible to have a particle whose wavefunction is a (complex) plane wave, and therefore it is physically impossible to have a definite momentum. 

Nevertheless, just as it is extremely **useful** to use position states $\ket{x}$, it is similarly useful to use the momentum states $\ket{p}$, even though they aren't valid quantum states. 

## The momentum operator

One use of the states $\ket{p}$ is that they allow us to define the **momentum operator** $\hat{P}$. Recall that, **by definition**, this is the operator for which the momentum states $\ket{p}$ are **eigenstates**, with corresponding momentum eigenvalue $p$, 
````{card}
```{math}
:label: e-momentum-op
\hat{P}\ket{p} = p\ket{p}.
```
````
We will return to the momentum operator shortly, and find its associated operator $\op{P}$. Before doing so, we will first introduce the **momentum wavefunction**.

## The momentum wavefunction

Just as we can write any quantum state $\ket{\psi}$ as a **superposition of position states** $\ket{x}$ using the **spatial wavefunction** $\psi(x)$, we can also write it as a **superposition of momentum states** $\ket{p}$, 
````{card}
```{math}
:label: e-general-state-momentum
\ket{\psi} = \infint \tilde{\psi}(p) \ket{p} dp,
```
````
where $\tilde{\psi}(p)$ is called the **momentum wavefunction**. 
```{aside}
We will typically refer to $\psi(x)$ as just 'the wavefunction' since it is the wavefunction we will spend the majority of our time studying. When it is important to be clear, we will refer to it more precisely as the 'spatial wavefunction'. Similarly, we will mostly refer to $\tilde{\psi}(p)$ as the 'momentum wavefunction'. If it is clear from context, we will also just refer to this as the wavefunction. $\ket{x}$ and $\ket{p}$ are two different (continuous!) bases, and the wavefunctions are just the coefficients of the quantum state $\ket{\psi}$ in these two different bases. 
```
Just as we saw in [](#e-norm-wavefunction), the normalisation of the quantum state, $\| \ket{\psi} \| = 1$ implies that
```{math}
\infint |\tilde{\psi}(p)|^2 = 1.
```
We also know that this is related to the normalisation of **momentum measurements**. In particular, if we were to **measure the momentum of a quantum particle** (i.e. measure $\hat{P}$), then the **probability density** to obtain the outcome $p$ is
````{card}
```{math}
p(p) = |\tilde{\psi}(p)|^2
```
````
However, just as we saw that idealised position measurements are impossible, **so too are ideal momentum measurements**. These would need to have infinite resolution, which is impossible. In reality, we can also only perform **coarse-grained** momentum measurements, determining the momentum of the particle up to some level of precision. Nevertheless, it is very instructive to consider the momentum probability density $p(p) = |\tilde{\psi}(p)|^2$ that would arise from such idealised measurements. 

## Relationship between the spatial & momentum wavefunctions

It will prove useful to be able to go **directly** between the spatial wavefunction $\psi(x)$ and the momentum wavefunction $\tilde{\psi}(p)$ associated to the same quantum state $\ket{\psi}$. For example, in many situations we will specify a wavefunction $\psi(x)$, and if we want to consider e.g. measuring the momentum of the particle, we will need to calculate $\tilde{\psi}(p)$ in order to do this. Luckily there is a nice way to go between the two. 

To see how, first let us consider a state $\ket{\psi}$ written as a superposition of momentum states, as in [](#e-general-state-momentum). If we consider the scalar product of $\ket{\psi}$ with a momentum state $\ket{p'}$, we find
```{math}
\vph \inner{p'}{\psi} &= \infint \tilde{\psi}(p) \inner{p'}{p} dp,\\
&= \infint \tilde{\psi}(p) \delta(p-p') dp,\\
&= \tilde{\psi}(p').
```
What this shows is a very important relation:
````{card}
```{math}
\inner{p}{\psi} = \tilde{\psi}(p).
```
````
Starting from $\ket{\psi}$ written as a superposition of position states as in [](#e-general-quantum-state), we similarly arrive at
````{card}
```{math}
:label: e-x-scalar
\inner{x}{\psi} = \psi(x).
```
````
We can now uses these facts in an interesting way. We start again with a quantum state written in the form [](#e-general-state-momentum), but we now take the scalar product with $\ket{x}$, leading to
```{math}
\inner{x}{\psi} &= \bra{x}\left(\infint \tilde{\psi}(p) \ket{p} dp \right),\\
\psi(x) &= \infint \tilde{\psi}(p) \inner{x}{p}dp,\\
&= \infint \tilde{\psi}(p) v_p(x) dp,
```
where in the third line we have used [](#e-x-scalar), for the quantum state $\ket{\psi'} = \ket{p}$, a state of definite momentum, and used [](#e-momentum-state-1), to recall that for such states, the wavefunction is $v_p(x)$, as we saw at the beginning of this Chapter. Substituting in [](#e-momentum-state-wavefunction) (with correct choice for $A$!), we finally obtain
````{card}
```{math}
:label: e-psi-p-to-psi-x
\psi(x) = \frac{1}{\sqrt{2\pi\hbar}}\infint \tilde{\psi}(p) e^{ipx/\hbar} dp.
```
````
This gives the spatial wavefunction in terms of the momentum wavefunction. As an exercise, using the fact that $\inner{p}{x} = \left(\inner{x}{p}\right)^*, you will show that we can also obtain the other direction, 
````{card}
```{math}
:label: e-psi-x-to-psi-p
\tilde\psi(p) = \frac{1}{\sqrt{2\pi\hbar}}\infint \psi(x) e^{-ipx/\hbar} dx,
```
````
which gives the momentum wavefunction in terms of the spatial wavefunction. It is important to note the symmetry between these two expressions. One key **distinction** is that in the former, the exponential comes with a plus-sign, while in the latter it comes with a minus-sign. Getting this sign wrong is a very easy and common mistake!

You have encountered these type of equations before — this is nothing but the **Fourier transform** and its inverse! That is, the spatial wavefunction is the Fourier transform of the momentum wavefunction, and conversely the momentum wavefunction is the inverse Fourier transform of the spatial wavefunction! The reason why this might look unfamiliar is that instead of using the usual variable $k$, we are using the physical variable — the momentum — instead. What is $k$ usually? It is the **wavenumber** of a wave, which we can recall is related to the wavelength via $k = 2\pi/\lambda$. Substituting this into de Broglie relation [](#e-de-Broglie), we see that $2\pi / k = h / p$, which after re-arranging gives $p = \hbar k$! A simple change of variable then takes us back to the 'standard' Fourier transform.

In hindsight, it is clear that this **had** to be the relation between the spatial and momentum wavefunctions. Why? Our starting point of this Chapter was to realise that states of definite momentum correspond to complex plane waves. A Fourier transform is precisely the way of transforming a function $f(x)$, represented in the normal fashion, as a value at each point $x$, into a superposition of plane waves, where $\tilde{f}(k)$ is the amplitude to have wavenumber $k$ (and hence wavelength $\lambda = 2\pi/k$). The only new ingredient for us is to realise that a wavenumber of $k$ corresponds to a momentum of $\hbar k$, and hence when we Fourier transform the wavefunction of a particle, we directly get its momentum wavefunction $\tilde{\psi}(p)$ — the 'amplitude' for it to have momentum $p$. 

## Momentum operator on spatial wavefunctions

The final thing we would like to do in this chapter is find the operator $\op{P}$ associated to the momentum operator $\hat{P}$, that acts **directly** on the (spatial) wavefunction $\psi(x)$, as we studied in [](#s-operators-on-wf). What we would like to find is the operator $\op{P}$ such that
```{math}
\hat{P}\ket{\psi} = \infint \left(\op{P}\psi(x)\right)\ket{x}dx.
```
In order to find this, we will use the relationship between $\psi(x)$ and $\tilde{\psi}(p)$. Recall from [](#e-momentum-op), that by definition $\hat{P}\ket{p} = p\ket{p}$. If we apply the momentum operator to a state written as a superposition of momentum states as in [](#e-general-state-momentum), we therefore find
```{math}
\vph \hat{P}\ket{\psi} &= \hat{P}\infint \tilde{\psi}(p)\ket{p} dp, \\
&= \infint \tilde{\psi}(p) \hat{P}\ket{p} dp, \\
&= \infint \tilde{\psi}(p) p\ket{p} dp, \\
&= \infint \tilde{\psi}'(p) \ket{p} dp, \\
```
where in the last line we have defined $\tilde{\psi}'(p) = p\tilde{\psi}(p)$. What this shows is that, just as the position operator mulitples a spatial wavefunction by $x$, as we saw in [](#e-X-on-psi), so too does the momentum operator multiple a momentum wavefunction by $p$. 

The question we then need to answer is: if a momentum wavefunction changes from $\tilde{\psi}(p)$ to $\tilde{\psi}'(p) = p\tilde{\psi}(p)$, what happens to the associated spatial wavefunction $\psi(x)$? That is, what is the wavefunction $\psi'(x)$ associated to $\tilde{\psi}'(p)$, and how does it relate to $\psi(x)$?

We can answer this using [](#e-psi-p-to-psi-x):
```{math}
:label: e-momentum-op-calc-1
\vph\psi'(x) &= \frac{1}{\sqrt{2\pi\hbar}}\infint \tilde{\psi}'(p) e^{ipx/\hbar} dp,\\
&= \frac{1}{\sqrt{2\pi\hbar}}\infint p\tilde{\psi}(p) e^{ipx/\hbar} dp.\\
```
At this stage we can use a fascinating 'trick'. We can notice that
```{math}
\vph\frac{\partial}{\partial x} e^{ipx/\hbar} = \frac{ip}{\hbar}e^{ipx/\hbar},
```
from which it follows that we can write
```{math}
\vph pe^{ipx/\hbar} = -i\hbar \frac{\partial}{\partial x} e^{ipx/\hbar}.
```
We can substitute this into [](#e-momentum-op-calc-1) to obtain
```{math}
\psi'(x) &= \frac{1}{\sqrt{2\pi\hbar}}\infint \tilde{\psi}(p) \left(-i\hbar \frac{\partial}{\partial x}\right) e^{ipx/\hbar} dp, \\
&= -i\hbar \frac{\partial}{\partial x}\left(\frac{1}{\sqrt{2\pi\hbar}}\infint \tilde{\psi}(p)  e^{ipx/\hbar} dp\right),\\
&= -i\hbar \frac{\partial}{\partial x}\psi(x),
```
where in the second line we used the fact that since $\tilde{\psi}(p)$ is independent of $x$, we can 'pull' the partial deriative through it, and in fact all the way out of the integral altogether, and in the final line we used the fact that the integral that remains is nothing but [](#e-psi-p-to-psi-x). What this shows is that multiplying a momentum wavefunction by $p$ **has the effect of differentiating the spatial wavefunction** (and multiplying it by $-i\hbar$)! This has thus answered our question, and we can see that
````{card}
```{math}
\op{P}\psi(x) = -i\hbar \frac{\partial}{\partial x}\psi{x}.
```
````
That is, the momentum operator $\op{P}$ is the the partial derivative multiplied by $-i\hbar$. In what is basically an abuse of notation, we will sometimes write $\op{P} = -i\hbar \frac{\partial}{\partial x}$. This is somewhat dangerous, as that partial derivative needs to act on something! Nevertheless, it is an operator in the sense that it acts on a function and returns a function.

Finally, it is instructive to look at what we get if we apply the momentum operator $\op{P}$ onto the wavefunctions $v_p(x) = \frac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar}$ associated to the momentum states $\ket{p}$. We see that
```{math}
\op{P}v_p(x) = -i\hbar \frac{\partial}{\partial x}\left(\frac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar}\right),\\
= -\frac{i\hbar}{\sqrt{2\pi\hbar}}\frac{ip}{\hbar}e^{ipx/\hbar},\\
= p \frac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar}.
```
Therefore we have
````{card}
```{math}
\op{P} v_p(x) = pv_p(x),
```
````
which is precisely an **eigenvalue equation** for wavefunctions of definite momentum. This is a very important form of **consistency**: the wavefunctions $v_p(x)$ which correspond to states of definite momentum are seen to be eigenstates of the operator $\op{P}$ which represents the momentum operator on wavefunctions. It is important to note that we could have in fact used $\op{P}$ to **find** the states $\ket{p}$. In particular, we could have first found the eigenfunctions $v_p(x)$ of $\op{P}$, and then **defined** $\ket{p} = \infint v_p(x) \ket{x}dx$, which would be eigenstates of $\hat{P}$ (a fact you will check as an exercise). 

It is also important to realise that we could have in fact started this whole chapter in reverse, and **defined first** the momentum operator $\op{P}$, and used this to arrive at the momentum eigenfunctions $v_p(x)$, rather than postulate them as states of definite momentum as we did. Thanks to de Brogile, we didn't need to do this, as he already had the insight into what form the eigenfunctions should have, i.e. that they corresponded to plane waves. 

However, for other physical properties, this won't be the case — we won't know in advance what form wavefunctions should have in order to have a definite value of a given property (e.g. to have a definite energy or angular momentum). Our general procedure in these cases will be precisely to go in the other direction: For a given operator $\hat{A}$, to start from an operator $\op{A}$ (acting on wavefunctions), find its eigenfunctions, and then use **these** to define quantum states with definite properties, that is, the eigenstates of $\hat{A}$. A key example will be to find states of definite energy (in which case the operator of interest is the **Hamiltonian** $\hat{H}$). We will study this extensively in the following chapters. 